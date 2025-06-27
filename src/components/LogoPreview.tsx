"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Lightbulb, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAiSuggestionsAction } from "@/app/actions";
import type {
  SuggestLayoutInput,
  SuggestLayoutOutput,
} from "@/ai/flows/suggest-layout";

const LOGO_FONT_FAMILY = "var(--font-montserrat), 'Montserrat', sans-serif";

export default function LogoPreview() {
  const [text, setText] = useState<string>("Fontastic");
  const [spacing, setSpacing] = useState<number>(1);
  const [aiSuggestions, setAiSuggestions] =
    useState<SuggestLayoutOutput | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(72);

  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  const textSpanRef = useRef<HTMLSpanElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSpacingChange = (value: number[]) => {
    setSpacing(value[0]);
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };
  //
  const handleGetAiSuggestions = async () => {
    if (!text.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to get AI suggestions.",
        variant: "destructive",
      });
      return;
    }
    setIsLoadingAi(true);
    setAiSuggestions(null); // Clear previous suggestions

    const input: SuggestLayoutInput = {
      text,
      font: "Montserrat",
      spacing,
    };

    const result = await getAiSuggestionsAction(input);

    if ("error" in result) {
      toast({
        title: "AI Suggestion Error",
        description: result.error,
        variant: "destructive",
      });
    } else if (result) {
      setAiSuggestions(result);
      toast({
        title: "AI Suggestions Ready!",
        description: "Check out the recommendations below.",
      });
    } else {
      toast({
        title: "AI Suggestion Error",
        description: "Received no suggestions from AI.",
        variant: "destructive",
      });
    }
    setIsLoadingAi(false);
  };

  const getSvgData = (): {
    content: string;
    width: number;
    height: number;
    cleanText: string;
  } => {
    const cleanText = text.trim() || "logo";
    if (!textSpanRef.current)
      return { content: "", width: 0, height: 0, cleanText };

    const textElement = textSpanRef.current;
    const textBoundingBox = textElement.getBoundingClientRect();

    const padding = 20;
    const svgWidth = Math.max(textBoundingBox.width + 2 * padding, 100); 
    const svgHeight = Math.max(textBoundingBox.height + 2 * padding, 50);
    
    const computedStyle = window.getComputedStyle(textElement);
    const fillColor = computedStyle.color;

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${svgWidth}"
           height="${svgHeight}"
           viewBox="0 0 ${svgWidth} ${svgHeight}">
        <style>
          .logo-text {
            font-family: 'Montserrat', sans-serif; /* Embed specific font name */
            font-size: ${fontSize}px;
            font-weight: ${computedStyle.fontWeight};
            letter-spacing: ${spacing}px;
            fill: ${fillColor};
            text-anchor: middle;
            dominant-baseline: central;
          }
        </style>
        <text x="50%" y="50%" class="logo-text">${text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</text>
      </svg>
    `;
    return {
      content: svgContent,
      width: svgWidth,
      height: svgHeight,
      cleanText,
    };
  };

  const handleExportSVG = () => {
    if (!text.trim()) {
      toast({
        title: "Nothing to export",
        description: "Please enter some text.",
        variant: "destructive",
      });
      return;
    }
    const { content: svgString, cleanText } = getSvgData();
    if (!svgString) return;

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cleanText.replace(/\s+/g, "_")}_logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "SVG Exported!",
      description: "Your logo has been downloaded.",
    });
  };

  const handleExportPNG = () => {
    if (!text.trim()) {
      toast({
        title: "Nothing to export",
        description: "Please enter some text.",
        variant: "destructive",
      });
      return;
    }

    const { content: svgString, width, height, cleanText } = getSvgData();
    if (!svgString || width === 0 || height === 0) {
      toast({
        title: "Export Error",
        description: "Could not prepare image data.",
        variant: "destructive",
      });
      return;
    }

    const canvas = document.createElement("canvas");
    const scaleFactor = 2;
    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast({
        title: "Export Error",
        description: "Could not create PNG rendering context.",
        variant: "destructive",
      });
      return;
    }

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src); // Clean up blob URL
      try {
        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `${cleanText.replace(/\s+/g, "_")}_logo.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: "PNG Exported!",
          description: "Your logo has been downloaded.",
        });
      } catch (e) {
        console.error("Error converting canvas to PNG:", e);
        toast({
          title: "Export Error",
          description: "Failed to convert image to PNG format.",
          variant: "destructive",
        });
      }
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(img.src); 
      console.error("Error loading SVG into image for PNG export:", e);
      toast({
        title: "Export Error",
        description: "Could not load SVG for PNG conversion.",
        variant: "destructive",
      });
    };

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    img.src = URL.createObjectURL(svgBlob);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle className="text-xl md:text-2xl">
            Design Your Text
          </CardTitle>
          <CardDescription>
            Enter your text and adjust its appearance.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="logoText" className="font-semibold text-base">
              Logo Text
            </Label>
            <Input
              id="logoText"
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="e.g., Fontastic"
              className="text-lg p-3"
              aria-label="Logo text input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fontSize" className="font-semibold text-base">
                Font Size:{" "}
                <span className="font-normal text-muted-foreground">
                  {fontSize}px
                </span>
              </Label>
              <Slider
                id="fontSize"
                min={12}
                max={200}
                step={1}
                value={[fontSize]}
                onValueChange={handleFontSizeChange}
                aria-label="Font size slider"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="letterSpacing"
                className="font-semibold text-base"
              >
                Letter Spacing:{" "}
                <span className="font-normal text-muted-foreground">
                  {spacing.toFixed(1)}px
                </span>
              </Label>
              <Slider
                id="letterSpacing"
                min={-10}
                max={50}
                step={0.1}
                value={[spacing]}
                onValueChange={handleSpacingChange}
                aria-label="Letter spacing slider"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle className="text-xl md:text-2xl">Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div
            ref={previewRef}
            className="w-full min-h-[250px] bg-secondary flex items-center justify-center p-4 rounded-md border-2 border-dashed border-muted overflow-hidden"
            aria-live="polite"
            role="img"
            aria-label={`Logo preview: ${text}`}
          >
            <span
              ref={textSpanRef}
              style={{
                fontFamily: LOGO_FONT_FAMILY,
                fontSize: `${fontSize}px`,
                letterSpacing: `${spacing}px`,
                color: "hsl(var(--foreground))",
                fontWeight: "500", // Medium weight for Montserrat
                whiteSpace: "pre",
                textAlign: "center",
                transition:
                  "font-size 0.2s ease-out, letter-spacing 0.2s ease-out",
              }}
            >
              {text || "Your Text Here"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
            <Lightbulb className="text-accent h-6 w-6" /> AI Design Assistant
          </CardTitle>
          <CardDescription>
            Get layout and spacing suggestions from our AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Button
            onClick={handleGetAiSuggestions}
            disabled={isLoadingAi}
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isLoadingAi ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-5 w-5" />
            )}
            Get AI Suggestions
          </Button>
          {isLoadingAi && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating creative ideas...
            </p>
          )}
          {aiSuggestions && (
            <Card className="bg-background mt-6 border-accent border-l-4 rounded-r-lg">
              <CardHeader>
                <CardTitle className="text-lg text-accent">
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold">Suggested Spacing:</h4>
                  <p className="text-muted-foreground">
                    {aiSuggestions.suggestedSpacing.toFixed(1)}px
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-accent text-accent hover:bg-accent/10"
                    onClick={() => setSpacing(aiSuggestions.suggestedSpacing)}
                  >
                    Apply Spacing
                  </Button>
                </div>
                <hr className="my-3" />
                <div>
                  <h4 className="font-semibold">Layout Suggestions:</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {aiSuggestions.layoutSuggestions}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle className="text-xl md:text-2xl">
            Export Your Creation
          </CardTitle>
          <CardDescription>Download your design as SVG or PNG.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleExportSVG}
              variant="outline"
              className="flex-1 py-6 text-base border-primary text-primary hover:bg-primary/5"
            >
              <Download className="mr-2 h-5 w-5" />
              Export as SVG
            </Button>
            <Button
              onClick={handleExportPNG}
              variant="outline"
              className="flex-1 py-6 text-base border-primary text-primary hover:bg-primary/5"
            >
              <ImageIcon className="mr-2 h-5 w-5" />
              Export as PNG
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
