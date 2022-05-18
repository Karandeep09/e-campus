
const Error404 = () => {
    return (
        <>
            <div className="errorpage">
                <img src={process.env.PUBLIC_URL + '/img/error404.png'} alt="Error 404" />
                <p>Error: Page Not Found.</p>
                <p>Get back to Home page.</p>
            </div>
        </>
    );
}
 
export default Error404;