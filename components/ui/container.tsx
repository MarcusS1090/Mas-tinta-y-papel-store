interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className="mx-auto w-[1696px]  h-[159px]">
            {children}
        </div>
    );
}

export default Container;