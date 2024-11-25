// components/RegisterForm.tsx
import React, { useState, useEffect } from "react";

type RegisterFormProps = {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    // Clear name error when name changes
    if (name.trim() !== "") {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  }, [name]);

  useEffect(() => {
    // Clear email error when email changes
    if (email.trim() !== "" && /\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  }, [email]);

  useEffect(() => {
    // Clear password error when password changes
    if (password.length >= 6) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  }, [password]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ name, email, password });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w- mx-auto p-8 bg-white rounded-lg shadow-md"
    >
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Name:
        </label>
        <input
          id="name"
          data-testid="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full  px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
            ${
              errors.name
                ? "border-red-500 bg-red-50 focus:ring-red-500"
                : "border-gray-300"
            }`}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          id="email"
          data-testid="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
            ${
              errors.email
                ? "border-red-500 bg-red-50 focus:ring-red-500"
                : "border-gray-300"
            }`}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Password:
        </label>
        <input
          id="password"
          data-testid="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
            ${
              errors.password
                ? "border-red-500 bg-red-50 focus:ring-red-500"
                : "border-gray-300"
            }`}
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        data-testid="submit-button"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Register
      </button>
    </form>
  );
}
