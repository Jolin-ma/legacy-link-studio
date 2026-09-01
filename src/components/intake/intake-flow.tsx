"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { emptyIntakeData, type IntakeData } from "./types";
import { ProgressLine } from "./progress-line";
import { StepGiver } from "./steps/step-giver";
import { StepCouple } from "./steps/step-couple";
import { StepStory } from "./steps/step-story";
import { StepFootage } from "./steps/step-footage";
import { StepReveal } from "./steps/step-reveal";
import { StepPackage } from "./steps/step-package";
import { StepSparkPhotos } from "./steps/step-spark-photos";
import { StepSparkDelivery } from "./steps/step-spark-delivery";
import { buildOrderDraft, saveOrderDraft } from "@/lib/order-draft";

type UpdateFn = <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;

interface StepDef {
  label: string;
  isValid: (data: IntakeData) => boolean;
  render: (data: IntakeData, update: UpdateFn) => ReactNode;
}

const giverStep: StepDef = {
  label: "About You",
  isValid: (d) => d.giverName.trim() !== "" && d.giverEmail.trim() !== "",
  render: (data, update) => <StepGiver data={data} update={update} />,
};

const packageStep: StepDef = {
  label: "Choose Your Package",
  isValid: (d) => d.tier !== "",
  render: (data, update) => <StepPackage data={data} update={update} />,
};

const sparkPhotosStep: StepDef = {
  label: "Your Photos",
  isValid: (d) => d.sparkPhotos.length >= 3 && d.sparkPhotos.length <= 4,
  render: (data, update) => <StepSparkPhotos data={data} update={update} />,
};

const sparkDeliveryStep: StepDef = {
  label: "Delivery & Review",
  isValid: (d) => {
    if (d.recipientEmails.trim() === "") return false;
    if (d.displayAddon) {
      const a = d.shippingAddress;
      return (
        a.line1.trim() !== "" &&
        a.city.trim() !== "" &&
        a.state.trim() !== "" &&
        a.postalCode.trim() !== "" &&
        a.country.trim() !== ""
      );
    }
    return true;
  },
  render: (data, update) => <StepSparkDelivery data={data} update={update} />,
};

const coupleStep: StepDef = {
  label: "The Couple",
  isValid: (d) =>
    d.partner1Name.trim() !== "" &&
    d.partner2Name.trim() !== "" &&
    d.relationshipStart !== "" &&
    d.milestone !== "" &&
    (d.milestone !== "other" || d.milestoneOther.trim() !== ""),
  render: (data, update) => <StepCouple data={data} update={update} />,
};

const storyStep: StepDef = {
  label: "The Story",
  isValid: (d) => d.howMet.trim() !== "" && d.proposalMoment.trim() !== "" && d.tone !== "",
  render: (data, update) => <StepStory data={data} update={update} />,
};

const footageStep: StepDef = {
  label: "The Footage",
  isValid: (d) =>
    d.photos.length > 0 &&
    d.musicPreference !== "" &&
    (d.musicPreference !== "song" || d.songChoice.trim() !== ""),
  render: (data, update) => <StepFootage data={data} update={update} />,
};

const revealStep: StepDef = {
  label: "The Reveal & Review",
  isValid: (d) => {
    if (
      d.revealDate === "" ||
      d.revealMode === "" ||
      d.recipientEmails.trim() === "" ||
      (d.giverName.trim() !== "" && d.notifyMode === "")
    ) {
      return false;
    }
    if (d.tier === "heirloom" || d.displayAddon) {
      const a = d.shippingAddress;
      return (
        a.line1.trim() !== "" &&
        a.city.trim() !== "" &&
        a.state.trim() !== "" &&
        a.postalCode.trim() !== "" &&
        a.country.trim() !== ""
      );
    }
    return true;
  },
  render: (data, update) => <StepReveal data={data} update={update} />,
};

function buildSteps(mode: "self" | "gift", tier: IntakeData["tier"]): StepDef[] {
  const lead = mode === "gift" ? [giverStep] : [];
  const tail =
    tier === "spark"
      ? [sparkPhotosStep, sparkDeliveryStep]
      : tier === "forever" || tier === "heirloom"
      ? [coupleStep, storyStep, footageStep, revealStep]
      : [];
  return [...lead, packageStep, ...tail];
}

export function IntakeFlow({ mode = "self" }: { mode?: "self" | "gift" }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<IntakeData>(emptyIntakeData);

  const steps = useMemo(() => buildSteps(mode, data.tier), [mode, data.tier]);

  const update: UpdateFn = (key, value) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const totalSteps = steps.length;
  const currentStep = steps[Math.min(step, totalSteps - 1)];
  const valid = currentStep.isValid(data);
  const isLastStep = step >= totalSteps - 1;

  const goNext = () => {
    if (!valid) return;
    if (isLastStep) {
      saveOrderDraft(buildOrderDraft(data));
      router.push("/checkout");
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <div className="pb-32">
      <ProgressLine
        current={Math.min(step, totalSteps - 1)}
        total={totalSteps}
        label={currentStep.label}
      />

      <div className="mx-auto mt-14 max-w-2xl overflow-hidden px-6 md:px-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, y: direction > 0 ? 16 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -16 : 16 }}
            transition={{ duration: 0.55, ease: [0.45, 0, 0.15, 1] }}
          >
            {currentStep.render(data, update)}
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50 transition-colors duration-300 hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-0"
          >
            Back
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!valid}
            className="rounded-full bg-forest px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:bg-forest-deep disabled:cursor-not-allowed disabled:bg-forest/25 disabled:text-ivory/50 disabled:hover:bg-forest/25"
          >
            {isLastStep ? "Continue to checkout" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
