import React, { useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }) => {
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: "",
      description: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  }

  const validateStep = () => {
    const newErrors = {};

    switch (step) {
      case (1): 
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.date) newErrors.date = "Date is required";
        if (!formData.time) newErrors.time = "Time is required";
        break;
      case (2): 
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.maxAttendees || formData.maxAttendees <= 0) newErrors.maxAttendees = "Maximum attendees must be greater than 0";
        break;
      case (3): 
        if (!formData.description.trim()) newErrors.description = "Description is required";
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1)
    }
  };
  const handleBack = () => setStep((prev) => prev - 1);
  const handleSubmit = () => {
    if (validateStep()){
      onCreateEvent(formData);
      resetForm();
      onClose();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                className="w-full p-2 border rounded-md"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="pl-8 w-full p-2 border rounded-md"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <div className="relative">
                  <input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="pl-8 w-full p-2 border rounded-md"
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm">{errors.time}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                  className="pl-8 w-full p-2 border rounded-md"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Attendees</label>
              <div className="relative">
                <input
                  name="maxAttendees"
                  type="number"
                  value={formData.maxAttendees}
                  onChange={handleInputChange}
                  placeholder="Enter max attendees"
                  className="pl-8 w-full p-2 border rounded-md"
                />
                {errors.maxAttendees && (
                  <p className="text-red-500 text-sm">{errors.maxAttendees}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter event description"
                rows={4}
                className="w-full p-2 border rounded-md"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Event Summary</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Title:</span> {formData.title}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {formData.date}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {formData.time}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {formData.location}
                </p>
                <p>
                  <span className="font-medium">Max Attendees:</span> {formData.maxAttendees}
                </p>
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
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[500px] min-h-[400px] max-h-[80vh] w-full max-w-md max-h-[90vh] translate-y-[50px] overflow-y-auto relative">
            <Dialog.Title className="text-lg font-medium flex justify-between sticky top-0 bg-white pb-2 translate-y-[-10px]">
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateEventModal;