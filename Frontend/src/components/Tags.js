const Tags = ( {tags} ) => {

    let ptags = [];
    tags = JSON.parse(tags);
    console.log(tags);
    if(tags){
       tags.forEach(tag => (
           ptags.push(tag[0])
       ))
    }
    const tagElements = ptags.map(tag => {
        return (
            <p>#{tag}</p>
        )
    })
        
    return (
        <>
           {tagElements}   
        </>
    )
}

export default Tags;