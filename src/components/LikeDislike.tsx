import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import IconButton from "@mui/material/IconButton"
import {observer} from "mobx-react-lite"

interface Props {
    list: string[]
    name: string
    like: (login: string) => void
    dislike: (login: string) => void
}

const LikeDislike = observer(({list, name, like, dislike}: Props) => {

    const liked = list.includes(name)
    const handleClick = () => {
        if (liked) {
            dislike(name)
        } else {
            like(name)
        }
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                {liked ? <FavoriteIcon color={"primary"} fontSize={"small"}/> :
                    <FavoriteBorderIcon color={"primary"} fontSize={"small"}/>}
            </IconButton>
        </>
    )
})

export default LikeDislike