import Sauce from '../models/Sauce.js';

export const likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((Sauce) => {
            //like = 1 (likes +1)
            console.log('!Sauce.usersLiked.includes(req.body.userId)', !Sauce.usersLiked.includes(req.body.userId));
            console.log('Sauce.usersLiked', Sauce.usersLiked);

            if (Sauce.usersLiked.includes(req.body.userId) && (req.body.like === 1)) {
                //mise a jour bdd 
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "user like +1" }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                console.log('error');
            }

        })
        .catch(error => res.status(404).json({ error }));
    //like = 0 (likes = 0 ,pas de vote)
    //userId est dans userliked ET like = 0
    if (!Sauce.usersLiked.includes(req.body.userId) && (req.body.like === 0)) {
        //mise a jour bdd 
        console.log('la conditions est bonne');
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId }
            }
        )
            .then(() => res.status(201).json({ message: "user like 0" }))
            .catch(error => res.status(400).json({ error }));
    }
    //like = -1 (dislikes = +1) userId est dans usersDisliked et dislikes = 1
    if (!Sauce.usersDisliked.includes(req.body.userId) && (req.body.like === -1)) {
        //mise a jour bdd 
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId }
            }
        )
            .then(() => res.status(201).json({ message: "user dislikes +1" }))
            .catch(error => res.status(400).json({ error }));
    }
    // si like = -1 on me un like = 0 ( on enleve le dislike)
    //userId est dans usersDisliked ET like = 0
    if (Sauce.usersDisliked.includes(req.body.userId) && (req.body.like === 0)) {
        //mise a jour bdd 
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: -1 },
                $pull: { usersLiked: req.body.userId }
            }
        )
            .then(() => res.status(201).json({ message: "user dislike 0" }))
            .catch(error => res.status(400).json({ error }));
    }
}