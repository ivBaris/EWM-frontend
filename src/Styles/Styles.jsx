import { makeStyles } from "@material-ui/core/styles";

const ownStyles = makeStyles({
  EventCounter: {
    margin: "1rem",
    fontSize: "1.2rem",
  },
  EventFormTitle: {
    margin: "5rem 1rem 0",
  },
  Form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "5rem",
  },
  FieldMargin: {
    margin: "1rem",
  },
  ButtonsGrouped: {
    display: "flex",
    margin: "1rem",
    flexDirection: "row",
  },
  CancelButton: {
    flex: 1,
    marginRight: "0.5rem",
  },
  CreateButton: {
    flex: 1,
    marginLeft: "0.5rem",
  },
  CardWrapper: {
    maxWidth: "100%",
    margin: "1rem",
  },
  CardAction: {
    display: "flex",
  },
  CardMedia: {
    flexGrow: 1,
    width: "40%",
  },
  CardContent: {
    flexGrow: 1,
    width: "60%",
    height: "8rem",
  },
  EventDetailMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  Avatar: {
    background: "#318fb5",
  },
  UserCardContent: {
    background: "#ecf5f8",
    display: "flex",
    alignItems: "center",
    padding: "1rem !important",
  },
  UserCardText: {
    marginLeft: "1rem",
    color: "#318fb5",
  },
  CategorySelector: {
    display: "grid",
    margin: "1rem",
  },
  ProfilePage: {
    display: "flex",
    flexDirection: "column",
    margin: "4.5rem 0 8rem",
  },
  ctaButton: {
    position: "fixed",
    bottom: "3.5rem",
    borderRadius: "0",
    width: "100%",
    height: "4rem",
  },
  NavigationButtonsGroup: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem",
    alignItems: "center",
  },
  button: {
    marginTop: "1rem",
    width: "15rem",
  },
  Search: {
    display: "flex",
    flexDirection: "column",
  },
  SearchInput: {
    margin: "0.5rem 3rem",
  },
  SearchButton: {
    width: "fit-content",
    margin: "0.5rem 3rem",
    alignSelf: "flex-end",
  },
});

export default ownStyles;
