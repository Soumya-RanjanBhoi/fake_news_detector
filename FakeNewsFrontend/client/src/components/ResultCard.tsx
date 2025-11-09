import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface ResultCardProps {
  label: string;
  probability: number;
}

export default function ResultCard({ label, probability }: ResultCardProps) {
  const isFake = label.toLowerCase().includes("fake");
  const isReal = label.toLowerCase().includes("real") || label.toLowerCase().includes("true");
  
  // Handle both decimal (0-1) and percentage (0-100) formats from API
  const percentage = probability > 1 ? probability.toFixed(1) : (probability * 100).toFixed(1);

  return (
    <Card className="border-2">
      <CardContent className="p-8 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-card">
            {isFake ? (
              <XCircle className="w-12 h-12 text-destructive" data-testid="icon-fake" />
            ) : isReal ? (
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" data-testid="icon-real" />
            ) : (
              <AlertCircle className="w-12 h-12 text-muted-foreground" data-testid="icon-unknown" />
            )}
          </div>
          
          <Badge
            variant={isFake ? "destructive" : "secondary"}
            className={`text-lg px-6 py-3 font-bold uppercase ${
              isReal ? "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white" : ""
            }`}
            data-testid="badge-result"
          >
            {label}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground" data-testid="text-probability">
                {percentage}%
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mt-1">
                Confidence
              </div>
            </div>
          </div>

          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFake
                  ? "bg-destructive"
                  : isReal
                  ? "bg-green-600 dark:bg-green-500"
                  : "bg-muted-foreground"
              }`}
              style={{ width: `${percentage}%` }}
              data-testid="progress-bar"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Prediction
            </div>
            <div className="text-base font-semibold text-foreground" data-testid="text-label">
              {label}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Accuracy
            </div>
            <div className="text-base font-semibold text-foreground" data-testid="text-accuracy">
              {percentage}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
