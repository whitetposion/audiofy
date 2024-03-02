
interface BoxProps {
     children: React.ReactNode;
}
const Box: React.FC<BoxProps> = ({
     children
}) =>{
     return (
          <div className="mx-auto max-w-7xl">
               {children}
          </div>
     )
}
export default Box;