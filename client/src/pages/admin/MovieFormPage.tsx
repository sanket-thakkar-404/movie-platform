import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const MovieFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    posterUrl: "",
    description: "",
    movieId: "",
    releaseDate: "",
    trailerUrl: "",
    genre: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Movie title is required");
      return;
    }

    console.log("Form data:", form);

    toast.success(isEdit ? "Movie updated" : "Movie added");

    navigate("/admin/movies");
  };

  const fields = [
    { name: "title", label: "Movie Title" },
    { name: "movieId", label: "Movie ID" },
    { name: "posterUrl", label: "Poster URL" },
    { name: "trailerUrl", label: "Trailer YouTube Link" },
    { name: "genre", label: "Genre" },
    { name: "category", label: "Category" },
    { name: "releaseDate", label: "Release Date", type: "date" },
  ];

  return (
    <div className="max-w-3xl space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/movies")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div>
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Movie" : "Add Movie"}
          </h2>

          <p className="text-sm text-muted-foreground">
            {isEdit
              ? "Update movie information"
              : "Add a new movie to your platform"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-card border rounded-xl p-6 space-y-5"
      >

        {/* Grid fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {fields.map((field) => (
            <div key={field.name} className="space-y-2">

              <Label>{field.label}</Label>

              <Input
                name={field.name}
                type={field.type || "text"}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />

            </div>
          ))}

          {/* Description */}
          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>

            <Textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Enter movie description"
            />
          </div>

        </div>

        {/* Poster Preview */}
        {form.posterUrl && (
          <div className="pt-2">
            <Label>Poster Preview</Label>

            <img
              src={form.posterUrl}
              alt="poster preview"
              className="mt-2 w-32 rounded-md border"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">

          <Button type="submit">
            {isEdit ? "Update Movie" : "Add Movie"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/movies")}
          >
            Cancel
          </Button>

        </div>

      </form>
    </div>
  );
};

export default MovieFormPage;