"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { QuizResultResponse } from "@/lib/types/quizz-result";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Spinner from "@/components/shared/spinner";

// ==============================================================================================================
// &&=> Variables
export const description = "A donut chart";

const chartConfig = {
  answers: {
    label: "Answers",
  },
  correct: {
    label: "Correct",
    color: "#00BC7D",
  },
  wrong: {
    label: "Wrong",
    color: "#EF4444",
  },
} satisfies ChartConfig;

// ================================================================================================================
// ^^=> Types
type ChartProps = {
  resultInfo: QuizResultResponse | null;
};
// ================================================================================================================

export default function MyChart({ resultInfo }: ChartProps) {
  // ==============================================================================================================
  // ^^==> Navigation
  const router = useRouter();
  // ================================================================================================================
  // !!==>Guard Clause
  if (!resultInfo) return;
  // ==================================================================================================================
  //^^=>Variables

  const totalQuestions = resultInfo.correct + resultInfo.wrong;

  const chartData = [
    {
      type: "correct",
      answers: resultInfo?.correct,
      fill: "var(--color-correct)",
    },
    {
      type: "wrong",
      answers: resultInfo.wrong,
      fill: "var(--color-wrong)",
    },
  ];

  // ===============================================================================================================
  // ??=> Handlers

  function handleStartNewExam() {
    router.back();
  }

  // ===============================================================================================================

  return (
    <>
    {!resultInfo ? <Spinner/>:<div className="space-y-4">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value, name) => {
                  const count = Number(value || 0);
                  const percent = totalQuestions
                    ? Math.round((count / totalQuestions) * 100)
                    : 0;

                  const label =
                    chartConfig[name as keyof typeof chartConfig]?.label ??
                    name;

                  return [`${count} (${percent}%)`, label];
                }}
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="answers"
            nameKey="type"
            innerRadius={60}
            strokeWidth={4}
          />
        </PieChart>
      </ChartContainer>

      <div className="text-center text-sm space-y-1">
        <p className="font-semibold">Total Questions: {totalQuestions}</p>
        <div>
          <p>
            <span className="text-green-600 font-medium">
              Correct: {resultInfo.correct}
            </span>
          </p>
          <span className="text-red-600 font-medium">
            Wrong: {resultInfo.wrong}
          </span>
        </div>
        <p className="text-gray-600 ">Score: {resultInfo.total}</p>
        <Button onClick={handleStartNewExam} className=" rounded-md">
          
          Start New Exam
        </Button>
      </div>
    </div>}
    
    
    </>
  );
}
