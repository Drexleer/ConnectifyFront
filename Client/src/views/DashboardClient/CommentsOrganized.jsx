export async function getComments() {
    const response = await fetch('https://connectifyback-dp-production.up.railway.app/comments/');
    const comments = await response.json();


    const filteredComments = comments.filter(comment => !comment.isDeleted);
    const mappedComments = filteredComments.map(comment => ({
        id: comment.Client._id,
        client_id: comment.Client._id, 
        clientName: `${comment.Client.name} ${comment.Client.lastName}`,
        clientPhoto: comment.Client.image, 
        comment: comment.comment,
        rating: comment.rating,
        professional_id: comment.Professional._id, 
        professionalName: `${comment.Professional.name} ${comment.Professional.lastName} (${comment.Professional.profession})`,
        professionalPhoto: comment.Professional.image, 
        date: new Date(comment.date).toLocaleDateString() 
    }));

   

    return mappedComments;
}
