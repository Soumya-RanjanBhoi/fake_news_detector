import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, AlertCircle, Loader2, RotateCcw } from "lucide-react";
import ResultCard from "@/components/ResultCard";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = "https://fake-news-detector-api-786177988089.asia-south1.run.app";

interface PredictionResult {
  label: string;
  probability: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("text");
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTextSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('text', text);

      const response = await fetch(`${API_BASE_URL}/predict_from_text?text=${encodeURIComponent(text)}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      toast({
        title: "Analysis Complete",
        description: "Your text has been analyzed successfully.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze text";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`${API_BASE_URL}/predict_files`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      toast({
        title: "Analysis Complete",
        description: "Your file has been analyzed successfully.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze file";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.pdf') || file.name.endsWith('.docx')) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError("Only PDF and DOCX files are supported");
        setSelectedFile(null);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-app-title">
              Fake News Detector
            </h1>
            <p className="text-sm text-muted-foreground">AI-Powered News Verification</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Verify News Authenticity
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Use our AI-powered tool to analyze news articles and determine their credibility.
            Paste text or upload a document to get started.
          </p>
        </div>

        <Card className="rounded-xl">
          <CardContent className="p-6 md:p-8 lg:p-12">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8" data-testid="tabs-input-method">
                <TabsTrigger value="text" data-testid="tab-text">
                  <FileText className="w-4 h-4 mr-2" />
                  Text Input
                </TabsTrigger>
                <TabsTrigger value="file" data-testid="tab-file">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-wide text-foreground">
                    Article Text
                  </label>
                  <Textarea
                    placeholder="Paste news article text here for analysis..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[300px] rounded-lg text-base resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    disabled={isLoading}
                    data-testid="input-text"
                  />
                  <div className="flex justify-end">
                    <span className="text-sm text-muted-foreground" data-testid="text-character-count">
                      {text.length} characters
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleTextSubmit}
                  disabled={isLoading || !text.trim()}
                  className="w-full md:w-auto px-12 py-6 text-lg font-semibold"
                  data-testid="button-analyze-text"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Text"
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="file" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-wide text-foreground">
                    Upload Document
                  </label>
                  
                  {!selectedFile ? (
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed rounded-lg cursor-pointer hover-elevate transition-colors"
                      data-testid="dropzone-file"
                    >
                      <div className="flex flex-col items-center space-y-4 p-8">
                        <Upload className="w-12 h-12 text-muted-foreground" />
                        <div className="text-center">
                          <p className="text-base font-medium text-foreground mb-2">
                            Drop PDF or DOCX file here or click to browse
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Supported formats: PDF, DOCX
                          </p>
                        </div>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        disabled={isLoading}
                        data-testid="input-file"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-6 border-2 rounded-lg bg-card">
                      <div className="flex items-center space-x-4">
                        <FileText className="w-10 h-10 text-primary" />
                        <div>
                          <p className="font-medium text-foreground" data-testid="text-filename">
                            {selectedFile.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        disabled={isLoading}
                        data-testid="button-remove-file"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleFileSubmit}
                  disabled={isLoading || !selectedFile}
                  className="w-full md:w-auto px-12 py-6 text-lg font-semibold"
                  data-testid="button-analyze-file"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze File"
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" data-testid="alert-error">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultCard label={result.label} probability={result.probability} />
            
            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-8"
                data-testid="button-analyze-another"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Analyze Another
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-12 py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Disclaimer:</strong> This tool uses AI and may not be 100% accurate. 
              Always verify information from multiple reliable sources before making decisions.
            </AlertDescription>
          </Alert>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by AI | Built for News Verification</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
