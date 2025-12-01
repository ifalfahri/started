"use client";

import { motion } from "motion/react";

interface StepQuestionProps {
  question: string;
}

export function StepQuestion({ question }: StepQuestionProps) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-2xl md:text-3xl font-serif text-center leading-relaxed"
    >
      {question}
    </motion.h3>
  );
}
