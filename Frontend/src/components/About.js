const About = () => {
    return (
        <>
        <div className="about-header">
            <h1>About</h1>
            <p>Sometimes we are unaware about things that are happening around us 
in our college like sharing of ideas among different people and college 
bodies about different topics, competitions, job updates, interview 
experiences, national level exam preparation strategies, knowledge of 
various coding techniques, subjects and so on. Sharing of information 
can be done easily using blogs which will be stored in the database as 
users write them and they will be served for KNITians. 
Internet has become reality and usage of internet become very much 
popular and there is tremendous increase of internet in all over the 
world for educational purpose. The Online Campus Blogging System is 
easy to use, full-featured and much more.</p>
            <img src={process.env.PUBLIC_URL + '/img/blogging.png'} alt="Writing Blog" />
            <p>Internet has become reality and usage of internet become very much 
popular and there is tremendous increase of internet in all over the 
world for educational purpose. The Online Campus Blogging System is 
easy to use, full-featured and much more. Here, different forums and 
councils can share information easily to everyone in the college. 
Students can share their interview experience or GATE preparation 
strategies etc.</p>
        </div>
        <footer>
            <p className="center">&copy; IT-Nerds</p>
        </footer>
        </>
    );
}
 
export default About;