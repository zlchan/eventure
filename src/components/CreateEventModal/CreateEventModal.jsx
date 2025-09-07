import React, { useState, useRef } from "react";
import { X, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuth } from "../../contexts/AuthContext"

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }) => {
  const { user } = useAuth();
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDateTime: "",
    location: "",
    category: "General",
    status: "Draft",
    isPublic: true,
    imageFile: null,
    capacity: 10,
    tags: [],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    registrationRequired: false,
    userId: user?.id
  });

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }
  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null }));
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const categories = [
    "General", "Conference", "Workshop", "Social", 
    "Networking", "Sports", "Music", "Art"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  }

  const resetForm = () => {
    setStep(1);
    setFormData({
      title: "",
      description: "",
      eventDateTime: "",
      location: "",
      category: "General",
      status: "Draft",
      isPublic: true,
      imageFile: null,
      capacity: 10,
      tags: [],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      registrationRequired: false,
      userId: user?.id
    });
    setPreviewImage(null);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  }

  const validateStep = () => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.eventDateTime) newErrors.eventDateTime = "Date and time is required";
        if (!formData.category) newErrors.category = "Category is required";
        break;
      case 2:
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.capacity || formData.capacity <= 0) newErrors.capacity = "Capacity must be greater than 0";
        if (!formData.timezone) newErrors.timezone = "Timezone is required";
        break;
      case 3:
        if (!formData.description.trim()) newErrors.description = "Description is required";
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1)
    }
  };
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (validateStep()) {
      const eventData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'tags') {
          eventData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null) {
          eventData.append(key, formData[key]);
        }
      });
      
      try {
        await onCreateEvent(eventData);
        resetForm();
        onClose();
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Title*</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                className="w-full p-2 border rounded-md"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date & Time*</label>
              <input
                name="eventDateTime"
                type="datetime-local"
                value={formData.eventDateTime}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.eventDateTime && <p className="text-red-500 text-sm">{errors.eventDateTime}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Public Event
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location*</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter event location"
                className="w-full p-2 border rounded-md"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Capacity*</label>
              <input
                name="capacity"
                type="number"
                min="1"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone*</label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                {/* Add more timezones as needed */}
              </select>
              {errors.timezone && <p className="text-red-500 text-sm">{errors.timezone}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <input
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                placeholder="music, art, conference"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <input
                  type="checkbox"
                  name="registrationRequired"
                  checked={formData.registrationRequired}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Registration Required
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter event description"
                rows={4}
                className="w-full p-2 border rounded-md"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Event Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                id="event-image-upload"
              />
              
              <div className="flex items-center gap-4">
                <label 
                  htmlFor="event-image-upload"
                  className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
                >
                  Choose Image
                </label>
                
                {previewImage && (
                  <div className="relative">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Event Summary</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Title:</span> {formData.title}</p>
                <p><span className="font-medium">Date & Time:</span> {formData.eventDateTime}</p>
                <p><span className="font-medium">Location:</span> {formData.location}</p>
                <p><span className="font-medium">Category:</span> {formData.category}</p>
                <p><span className="font-medium">Capacity:</span> {formData.capacity}</p>
                <p><span className="font-medium">Visibility:</span> {formData.isPublic ? "Public" : "Private"}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black/30" />
      <Dialog.Portal>
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[500px] min-h-[400px] max-h-[80vh] w-full max-w-md overflow-y-auto relative">
            <Dialog.Title className="text-lg font-medium flex justify-between sticky top-0 bg-white pb-2">
              Create New Event
              <button onClick={handleClose} className="rounded-sm hover:bg-gray-200 p-1">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Title>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === stepNumber ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      {stepNumber}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-500">Step {step} of 3</span>
              </div>
              
              {renderStep()}
              
              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <button onClick={handleBack} className="px-4 py-2 border rounded-md flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </button>
                )}
                {step < 3 ? (
                  <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center ml-auto">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center ml-auto">
                    Create Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateEventModal;