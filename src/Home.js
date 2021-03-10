import React, { useState } from "react";
import {
  Page,
  Text,
  Link,
  View,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import github from "./assets/github-brands.png";
import email from "./assets/email.png";
import linkdin from "./assets/linkdin.png";
import phone from "./assets/phone.png";
import other from "./assets/other.png";
import dot from "./assets/dot.png";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const styles = StyleSheet.create({
  root: {
    display: "flex",
  },
  header: {
    marginBottom: 3,
    textAlign: "center",
    fontSize: "28pt",
  },
  outerlink: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  outerlink2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    width: "16px",
    height: "16px",
    marginRight: 3,
  },
  dot: {
    width: "2px",
    height: "2px",
    marginRight: 8,
    marginLeft: 8,
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    margin: "30px 0px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          {props.item.lastName} {props.item.firstName}
        </Text>
        <View style={styles.outerlink}>
          {props.item.outerlink.map((item, index) => (
            <View style={styles.outerlink2} key={index}>
            {index > 0 ? (
              <Image style={styles.dot} src={dot}/>
            ):(
              <Text></Text>
            )}
              <Image style={styles.icons} src={item.src} />
              <Link src={item.link}>
                <Text>{item.text}</Text>
              </Link>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

function Home() {
  const classes = useStyles();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [outerlink, setOuterlink] = useState([]);
  const [contact, setContact] = useState(email);
  const [contactName, setContactName] = useState("");
  const [contactUrl, setContactUrl] = useState("");

  const x = {
    lastName,
    firstName,
    outerlink,
  };

  const changeFirstName = (e) => {
    setLastName(e.target.value);
  };

  const changeLastName = (e) => {
    setFirstName(e.target.value);
  };

  const changeContactName = (e) => {
    setContactName(e.target.value);
  };

  const changeContactUrl = (e) => {
    setContactUrl(e.target.value);
  };

  const handleContact = (e) => {
    setContact(e.target.value);
  };

  const addContact = () => {
    setOuterlink((prevOuterlink) => [
      ...prevOuterlink,
      { text: contactName, src: contact, link: contactUrl },
    ]);
  };

  const rmContact = (i) => {
    var array = [...outerlink]; // make a separate copy of the array
    if (i !== -1) {
      array.splice(i, 1);
      setOuterlink(array);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h3>Personal Information</h3>
        <hr style={{ marginBottom: "15px" }} />
        <form autoComplete="off">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Last Name"
            required
            size="small"
            value={lastName}
            style={{ marginRight: "5px" }}
            onChange={(e) => changeFirstName(e)}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="First Name"
            required
            size="small"
            value={firstName}
            onChange={(e) => changeLastName(e)}
          />
          <br />
        </form>
        <br />
        <h3>Contact/Links</h3>
        <hr />
        {outerlink.map((item, index) => (
          <List key={index}>
            <ListItem>
              <ListItemAvatar>
                <img src={item.src} alt={item.text} width={32}></img>
              </ListItemAvatar>
              <ListItemText primary={item.text} secondary={item.link} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => rmContact(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        ))}
        <form autoComplete="off">
          <IconButton
            aria-label="delete"
            className={classes.margin}
            onClick={() => addContact()}
          >
            <AddCircleOutlineIcon fontSize="inherit" />
          </IconButton>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Contact
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={contact}
              onChange={handleContact}
              label="Contact"
            >
              <MenuItem value={email}>Email</MenuItem>
              <MenuItem value={github}>GitHub</MenuItem>
              <MenuItem value={linkdin}>Linkdin</MenuItem>
              <MenuItem value={phone}>Phone</MenuItem>
              <MenuItem value={other}>Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="standard-basic"
            label="Title/Phone No."
            required
            value={contactName}
            onChange={(e) => changeContactName(e)}
            style={{ marginRight: "5px" }}
          />
          <TextField
            id="standard-basic"
            label="Url (Optional)"
            value={contactUrl}
            onChange={(e) => changeContactUrl(e)}
          />
          <br />
        </form>
        <br />
        <h3>Details</h3>
        <hr />
        <div>hi</div>
      </div>
      <div className="pdf-preview">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <span style={{ fontSize: "larger" }}>PDF Preview</span>
          <button onClick={() => "downloadPDF()"}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
        <PDFViewer height={600} width={400}>
          <MyDocument item={x} />
        </PDFViewer>
      </div>
    </div>
  );
}

export default Home;
