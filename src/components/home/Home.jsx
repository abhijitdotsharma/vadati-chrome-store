

export default function Home(){

    const isLoggedIn = true;

    return(
        <div 
        style={{
            margin: "auto",
            border:'1px solid',
            width: '20rem',
        }}
        >
            {isLoggedIn && <h3>Good ebening USER</h3>}
        </div>
    )
}