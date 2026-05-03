import { TextareaHTMLAttributes } from "react";
import { Intent } from "./intent";

type NativeTextAreaProps = Omit<
TextareaHTMLAttributes<HTMLTextAreaElement>,
"aria-invalid" | "data-intent"
>
type ForbiddenProps = {
    "data-intent"?: never;
    "aria-invalid"?: never;
};
export type TextAreaProps = NativeTextAreaProps & ForbiddenProps & {
    label?: string
    intent?: Intent
    invalid?: boolean
}

