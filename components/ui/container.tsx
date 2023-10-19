interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className="mx-auto w-11/12 h-40 ">
            {children}
        </div>
    );
}

export default Container;