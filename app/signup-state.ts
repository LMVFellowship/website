export type SignupState = {
  status: "idle" | "error" | "success";
  message: string;
  errors: {
    name?: string;
    email?: string;
    consent?: string;
  };
  /**
   * React resets an uncontrolled form once its action resolves, so the values
   * are echoed back here and re-applied as defaults. Without this a validation
   * error would wipe everything the visitor typed.
   */
  values: {
    name: string;
    email: string;
    consent: boolean;
  };
};

export const initialSignupState: SignupState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", email: "", consent: false },
};
