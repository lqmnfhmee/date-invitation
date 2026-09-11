"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { supabase } from "../lib/supabase";

const memories = [
  {
    id: 1,
    rotation: "-3deg",
    caption: "matcha tastes better with you 🍵",
    position: "left-2 top-2",
  },
  {
    id: 2,
    rotation: "4deg",
    caption: "one last little stop ♡",
    position: "right-2 top-[300px]",
  },
  {
    id: 3,
    rotation: "-2deg",
    caption: "ending our day together",
    position: "left-6 top-[600px]",
  },
];

export default function ChaBoysMemories() {
  const [photos, setPhotos] = useState({});
  const [deleting, setDeleting] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  // Load saved photos from Supabase
  useEffect(() => {
    const loadPhotos = async () => {
      const { data, error } = await supabase
        .from("memory_photos")
        .select("slot, photo_url, storage_path")
        .eq("memory_key", "cha-boys");

      if (error) {
        console.error("Failed to load Cha Boys memories:", error);
        return;
      }

      const savedPhotos = {};

      data.forEach((photo) => {
        savedPhotos[photo.slot] = {
          url: photo.photo_url,
          storagePath: photo.storage_path,
        };
      });

      setPhotos(savedPhotos);
    };

    loadPhotos();
  }, []);

  // Upload photo to Supabase Storage
  const handleUpload = async (event, id) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const fileExtension = file.name.split(".").pop();

      const filePath = `cha-boys/photo-${id}-${Date.now()}.${fileExtension}`;

      // Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from("date-memories")
        .upload(filePath, file, {
          cacheControl: "3600",
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert("Failed to upload photo.");
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("date-memories")
        .getPublicUrl(filePath);

      const photoUrl = publicUrlData.publicUrl;

      // Save photo information in database
      const { error: databaseError } = await supabase
        .from("memory_photos")
        .upsert(
          {
            memory_key: "cha-boys",
            slot: id,
            photo_url: photoUrl,
            storage_path: filePath,
          },
          {
            onConflict: "memory_key,slot",
          }
        );

      if (databaseError) {
        console.error("Database error:", databaseError);
        alert("Photo uploaded but could not save the photo record.");
        return;
      }

      // Update UI immediately
      setPhotos((previous) => ({
        ...previous,
        [id]: {
          url: photoUrl,
          storagePath: filePath,
        },
      }));
    } catch (error) {
      console.error("Unexpected upload error:", error);
      alert("Something went wrong while uploading.");
    }

    // Reset input so the same file can be selected again
    event.target.value = "";
  };

  // Delete photo from Storage + Database
  const handleDelete = async (id) => {
    const photo = photos[id];

    if (!photo) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this memory?"
    );

    if (!confirmed) return;

    setDeleting(id);

    try {
      // Delete actual file from Supabase Storage
      const { error: storageError } = await supabase.storage
        .from("date-memories")
        .remove([photo.storagePath]);

      if (storageError) {
        console.error("Storage delete error:", storageError);
        alert("Failed to delete the photo from storage.");
        return;
      }

      // Delete database record
      const { error: databaseError } = await supabase
        .from("memory_photos")
        .delete()
        .eq("memory_key", "cha-boys")
        .eq("slot", id);

      if (databaseError) {
        console.error("Database delete error:", databaseError);
        alert(
          "Photo file was deleted, but the database record could not be deleted."
        );
        return;
      }

      // Remove photo from UI
      setPhotos((previous) => {
        const updated = { ...previous };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      console.error("Unexpected delete error:", error);
      alert("Something went wrong while deleting the photo.");
    } finally {
      setDeleting(null);
      setOpenMenu(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff7f5] px-5 py-12">
      <div className="mx-auto max-w-lg">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="text-xs tracking-[0.35em] text-pink-400">
            MEMORY 05
          </p>

          <h1 className="mt-3 font-serif text-4xl text-gray-800">
            Cha Boys 🍵
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            One last little stop before we head home.
          </p>
        </motion.div>

        {/* Polaroid Collage */}
        <div className="relative mx-auto h-[900px] w-full max-w-md">

          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 30,
                rotate: 0,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: memory.rotation,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                type: "spring",
                stiffness: 120,
              }}
              className={`absolute ${memory.position} w-52 rounded-sm bg-white p-3 pb-7 shadow-xl`}
            >

              {/* Tiny Options Menu */}
              {photos[memory.id] && (
                <div className="absolute right-1 top-1 z-30">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      setOpenMenu(
                        openMenu === memory.id
                          ? null
                          : memory.id
                      );
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-gray-600"
                    aria-label="Memory options"
                  >
                    <span className="mb-1 text-lg leading-none">
                      ⋯
                    </span>
                  </button>

                  {/* Delete Menu */}
                  {openMenu === memory.id && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-300 shadow-sm transition hover:text-gray-500">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          handleDelete(memory.id);
                        }}
                        disabled={deleting === memory.id}
                        className="w-full px-4 py-3 text-left text-xs text-red-400 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deleting === memory.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Photo */}
              <label className="block cursor-pointer">
                {photos[memory.id] ? (
                  <img
                    src={photos[memory.id].url}
                    alt="Cha Boys memory"
                    className={`aspect-square w-full object-cover ${
                      deleting === memory.id
                        ? "opacity-50"
                        : ""
                    }`}
                  />
                ) : (
                  <div className="flex aspect-square w-full flex-col items-center justify-center bg-[#fff7f5]">
                    <span className="text-3xl font-light text-gray-700">
                      ＋
                    </span>

                    <span className="mt-2 text-xs tracking-wide text-gray-400">
                      Add memory
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) =>
                    handleUpload(event, memory.id)
                  }
                />
              </label>

              {/* Caption */}
              <p
                className={`mt-4 text-center font-serif text-sm text-gray-500 ${
                  deleting === memory.id
                    ? "opacity-50"
                    : ""
                }`}
              >
                {memory.caption}
              </p>

            </motion.div>
          ))}

        </div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-8 pb-16 text-center"
        >
          <p className="text-xs tracking-[0.25em] text-pink-400">
            OUR LITTLE DAY
          </p>

          <p className="mt-4 font-serif text-2xl leading-8 text-gray-700">
            And that's our little adventure. ♡
          </p>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-400">
            Five little places, a whole day together,
            and hopefully a lot of memories worth keeping.
          </p>

          <div className="mt-6 text-xl">
            🌷 📸 🍵 ♡
          </div>

          <p className="mt-6 text-sm text-pink-300">
            Until our next date ♡
          </p>
        </motion.div>

      </div>
    </main>
  );
}