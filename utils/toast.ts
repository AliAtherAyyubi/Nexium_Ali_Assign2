// utils/toastUtils.ts
import { toast } from "sonner";

export const showErrorToast = (title: string, description?: string) => {
  toast(title, {
    description,
    duration: 4000,
    style: {
      backgroundColor: "#f87171", // Red background for error
      color: "white", // White text color
      border: "1px solid #dc2626", // Darker red border
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow       
    }
  });
};

export const showSuccessToast = (title: string, description?: string) => {
  toast(title, {
    description,
    duration: 4000,
    style: {
      backgroundColor: "#34d399", // Green background for success
      color: "white", // White text color
      border: "1px solid #10b981", // Darker green border
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    },
  });
};

export const showWarningToast = (title: string, description?: string) => {
  toast(title, {
    description,
    duration: 4000,
    style: {
      backgroundColor: "#fbbf24", // Yellow background for warning
      color: "black", // Black text color
      border: "1px solid #f59e0b", // Darker yellow border
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    }
  });
};

export const showInfoToast = (title: string, description?: string) => {
  toast(title, {
    description,
    duration: 4000,
    style: {
      backgroundColor: "#60a5fa", // Blue background for info
      color: "white", // White text color
      border: "1px solid #2563eb", // Darker blue border
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    }
  });
};
