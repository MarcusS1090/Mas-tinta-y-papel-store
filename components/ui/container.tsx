"use client";

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className=" container px- mx-auto xl:w-10/12 lg:w-full md:w-screen sm:w-fit h-41">
            {children}
        </div>
    );
}

export default Container;