"use client";

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className="mx-auto lg:w-10/12 lg:h-40 bg-zinc-300 bg-opacity-0 border border-black">
            {children}
        </div>
    );
}

export default Container;