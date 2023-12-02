import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { AlertContext } from "../context/AlertContext";
import { getParentById, updateParentData } from "../firebase/ParentFunctions";
import { getNannyById, updateNannyData } from "../firebase/NannyFunctions";

// Importing Shadcn ui components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const aRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, userRole } = useContext(AuthContext);
  //const { showAlert } = useContext(AlertContext);
  const [alert, setAlert] = useState({ show: false, title: '', description: '' });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (currentUser) {
          if (userRole === "parent") {
            const parentData = await getParentById(currentUser.uid);
            console.log(parentData.image);
            setImageUrl(parentData.image);
          } else {
            const nannyData = await getNannyById(currentUser.uid);
            console.log(nannyData.image);
            setImageUrl(nannyData.image);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const resetInput = () => {
    aRef.current.value = null;
  };

  const showAlert = (title, description) => {
    setAlert({ show: true, title, description });
  };

  const closeAlert = () => {
    setAlert({ show: false, title: '', description: '' });
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!file) {
      showAlert("error", "File is empty. Please choose a file.");
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      showAlert(
        "error",
        "Invalid file type. Please choose a PNG, JPEG, or JPG file."
      );
      return;
    }

    setLoading(true);

    if (file) {
      try {
        const { url } = await fetch("http://localhost:3000/s3Url").then((res) =>
          res.json()
        );
        console.log(url);

        // post the image direclty to the s3 bucket
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: file,
        });

        const newImageUrl = url.split("?")[0];
        console.log(newImageUrl);

        if (userRole === "parent")
          await updateParentData(currentUser.uid, newImageUrl);
        else await updateNannyData(currentUser.uid, newImageUrl);

        setImageUrl(newImageUrl);

        showAlert("success", "Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        showAlert("error", "Error uploading image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <input
                ref={aRef}
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:border-0 file:text-sm file:font-semibold
                           file:bg-violet-50 file:text-violet-700
                           hover:file:bg-violet-100"
              />
            </div>
            <Button type="submit" onClick={resetInput} disabled={loading} className="w-full">
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </form>

          {imageUrl && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold">Current Image:</p>
              <img src={imageUrl} alt="Profile" className="rounded-lg shadow-md" />
            </div>
          )}
        </CardContent>
      </Card>

      {alert.show && (
        <AlertDialog open={alert.show} onOpenChange={closeAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alert.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {alert.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogAction onClick={closeAlert}>OK</AlertDialogAction>
            <AlertDialogCancel onClick={closeAlert}>Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      )}

    </div>
  );
};

export default Profile;


