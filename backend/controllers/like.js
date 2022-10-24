import Sauce from '../models/Sauce.js';

export const likeSauce = (req, res, next) => {

    const { userId, like } = req.body;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            //like = 1 (likes +1)
            if (like === 1) {
                //mise a jour bdd 
                sauce.likes += 1;
                sauce.usersLiked.push(req.body.userId);

            } else if (like === 0) {
                //like = 0 (likes = 0 ,pas de vote)
                //userId est dans userliked ET like = 0
                //mise a jour bdd (sauce.usersLiked.filter(keepUsers => keepUsers === userId))
                if (sauce.usersLiked.find(keepUsers => keepUsers === userId)) {
                    let myIndex = sauce.usersLiked.indexOf(userId);
                    if (myIndex != -1) {
                        sauce.likes -= 1;
                        sauce.usersLiked.splice(myIndex, 1);
                    }
                    // indexUsers = sauce.usersLiked.indexOf(userId);

                } else if (sauce.usersDisliked.find(keepUsers => keepUsers === userId)) {
                    let myIndex = sauce.usersDisliked.indexOf(userId);
                    if (myIndex != -1) {
                        sauce.dislikes -= 1;
                        sauce.usersDisliked.splice(myIndex, 1);
                    }
                }
            } else if (like === -1) {
                //like = -1 (dislikes = +1) userId est dans usersDisliked et dislikes = 1
                sauce.dislikes += 1;
                sauce.usersDisliked.push(userId);
                //mise a jour bdd 

            }
            Sauce.updateOne({ _id: sauce._id }, sauce)
                .then(() => res.status(201).json({ message: "user like +1" }))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(404).json({ error }))
}