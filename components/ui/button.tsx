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
                px-2
                py-3
                text-white lg:text-[15px] hover:text-black
                disabled:cursor-not-allowed
                disable:opacity-50
                hover:opacity-75
                transition
                `,
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
});

Button.displayName = "Button";

export default Button;