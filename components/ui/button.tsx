import { cn } from "@/lib/utils";

import { forwardRef } from "react";

export interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement> {}


const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
            className={cn(
                `
                w-auto
                px-auto
                text-white hover:text-black
                py-0
                disabled:cursor-not-allowed
                disable:opacity-50
                hover:opacity-75
                transition
                `,
                className
            )}
            ref={ref}
        >
            {children}
        </button>
    )
});

Button.displayName = "Button";

export default Button;