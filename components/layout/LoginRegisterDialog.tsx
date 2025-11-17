"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCustomerAuth } from "@/stores/useCustomerAuth";
import { useState } from "react";

export default function LoginRegisterDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const auth = useCustomerAuth(); 
  const loading = auth.loading;

  const [mode, setMode] = useState<"login" | "register">("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleSubmit = async () => {
    let success = false;

    if (mode === "login") {
      success = await auth.login(form.email, form.password);
    } else {
      success = await auth.register(form);
    }

    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Login" : "Register"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-3">
          {/* REGISTER FIELDS */}
          {mode === "register" && (
            <>
              <input
                placeholder="Name"
                className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Phone"
                className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Address"
                className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </>
          )}

          {/* EMAIL */}
          <input
            placeholder="Email"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* PASSWORD */}
          <input
            placeholder="Password"
            type="password"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white py-2 rounded"
          >
            {loading
              ? "Loading..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>

          {/* SWITCH MODE */}
          <p
            className="text-sm text-center underline cursor-pointer"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
