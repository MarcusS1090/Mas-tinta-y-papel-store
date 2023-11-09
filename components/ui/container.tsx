"use client";

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className=" container px-auto mx-auto xl:w-10/12 lg:w-9/12 md:w-screen sm:w-fit h-41">
            {children}
        </div>
    );
}

export default Container;