import type { TextAreaProps } from "../types/textarea";

export function TextArea({
    label,
    intent,
    invalid,
    disabled,
    ...rest
}: TextAreaProps) {
    const textareaEl = (
        <textarea
        data-intent={intent}
        disabled={disabled}
        aria-invalid={invalid ? "true" : undefined}
        {...rest}
        />
    )

    if(!label) return textareaEl

    return (
        <label>
            {label}
            {textareaEl}
        </label>
    )
}