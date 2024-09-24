import {
    Box,
    AppBar,
    Typography,
    Toolbar,
} from "@mui/material"
import { Link } from "react-router-dom"
import GithubIcon from "~/components/Icons/GithubIcon.tsx"
import text from "~/consts/text.ts"
import headerStyles from "./Header.styles.ts"


function Header() {
    return (
        <Box>
            <AppBar component={"nav"} sx={headerStyles.nav}>
                <Toolbar>
                    <Typography
                        variant={"h4"}
                        component={"div"}
                    >
                        {text.header.main}
                    </Typography>
                </Toolbar>
                <Box sx={headerStyles.icon}>
                    <Link to={text.header.githubLink} target={"_blank"}>
                        <GithubIcon
                            fill={"white"}
                            width={"50"}
                            height={"50"}
                        />
                    </Link>
                </Box>
            </AppBar>
        </Box>
    )
}

export default Header
