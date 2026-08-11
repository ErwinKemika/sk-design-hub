import { useState } from "react";
import { Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type LengthStatus = "empty" | "short" | "good" | "long";

function titleStatus(length: number): LengthStatus {
  if (length === 0) return "empty";
  if (length < 30) return "short";
  if (length <= 60) return "good";
  return "long";
}

function descriptionStatus(length: number): LengthStatus {
  if (length === 0) return "empty";
  if (length < 80) return "short";
  if (length <= 156) return "good";
  return "long";
}

const STATUS_STYLE: Record<LengthStatus, string> = {
  empty: "text-muted-foreground",
  short: "text-amber-500",
  good: "text-emerald-500",
  long: "text-red-500",
};

const STATUS_LABEL: Record<LengthStatus, string> = {
  empty: "Kosong, akan pakai judul/ringkasan otomatis",
  short: "Terlalu pendek",
  good: "Panjang ideal",
  long: "Terlalu panjang, bisa terpotong di Google",
};

function CheckItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className={cn("flex items-center gap-2 text-sm", ok ? "text-emerald-500" : "text-red-500")}>
      {ok ? <Check size={14} /> : <X size={14} />}
      <span className={ok ? "" : "text-foreground/70"}>{label}</span>
    </li>
  );
}

export function SeoFields({
  seoTitle,
  seoDescription,
  onSeoTitleChange,
  onSeoDescriptionChange,
  fallbackTitle,
  fallbackDescription,
  slug,
  urlPrefix,
  content = "",
}: {
  seoTitle: string;
  seoDescription: string;
  onSeoTitleChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
  fallbackTitle: string;
  fallbackDescription: string;
  slug: string;
  urlPrefix: string;
  content?: string;
}) {
  const [keyword, setKeyword] = useState("");

  const displayTitle = seoTitle || fallbackTitle || "Judul halaman";
  const displayDescription =
    seoDescription || fallbackDescription || "Deskripsi halaman akan tampil di sini.";
  const host = typeof window !== "undefined" ? window.location.host : "skinteriordesign.com";

  const tStatus = titleStatus(seoTitle.length);
  const dStatus = descriptionStatus(seoDescription.length);

  const kw = keyword.trim().toLowerCase();
  const checks = kw
    ? [
        { ok: displayTitle.toLowerCase().includes(kw), label: "Muncul di Meta Title" },
        { ok: displayDescription.toLowerCase().includes(kw), label: "Muncul di Meta Description" },
        { ok: slug.toLowerCase().includes(kw.replace(/\s+/g, "-")), label: "Muncul di Slug (URL)" },
        ...(content
          ? [{ ok: content.toLowerCase().includes(kw), label: "Muncul di isi konten" }]
          : []),
      ]
    : [];

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="focus_keyword">Fokus Kata Kunci (opsional)</Label>
        <Input
          id="focus_keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="mis. konstruksi baja jakarta"
        />
      </div>

      {checks.length > 0 && (
        <ul className="space-y-1.5 border border-border bg-background/50 p-4">
          {checks.map((c) => (
            <CheckItem key={c.label} ok={c.ok} label={c.label} />
          ))}
        </ul>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="seo_title">Meta Title</Label>
          <span className={cn("text-xs", STATUS_STYLE[tStatus])}>
            {seoTitle.length} karakter · {STATUS_LABEL[tStatus]}
          </span>
        </div>
        <Input
          id="seo_title"
          value={seoTitle}
          onChange={(e) => onSeoTitleChange(e.target.value)}
          placeholder={fallbackTitle}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="seo_description">Meta Description</Label>
          <span className={cn("text-xs", STATUS_STYLE[dStatus])}>
            {seoDescription.length} karakter · {STATUS_LABEL[dStatus]}
          </span>
        </div>
        <Textarea
          id="seo_description"
          rows={3}
          value={seoDescription}
          onChange={(e) => onSeoDescriptionChange(e.target.value)}
          placeholder={fallbackDescription}
        />
      </div>

      <div className="space-y-2">
        <Label>Preview di Google</Label>
        <div className="max-w-xl rounded-lg border border-border bg-white p-4 font-sans">
          <div className="flex items-center gap-2 text-xs text-[#4d5156]">
            <div className="h-6 w-6 shrink-0 rounded-full bg-gray-200" />
            <span className="truncate">
              {host}
              <span className="text-[#4d5156]">
                {" "}
                › {urlPrefix.replace(/\//g, "")} › {slug || "..."}
              </span>
            </span>
          </div>
          <div className="mt-1 truncate text-lg text-[#1a0dab]">{displayTitle}</div>
          <p className="mt-1 line-clamp-2 text-sm text-[#4d5156]">{displayDescription}</p>
        </div>
      </div>
    </div>
  );
}
