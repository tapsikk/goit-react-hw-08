import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { v4 as uuidv4 } from "uuid";
import style from "./contactForm.module.scss";
import * as Yup from "yup";

const TourSchema = Yup.object().shape({
  name: Yup.string().trim().min(3).max(50).required(),
  number: Yup.string().trim().min(3).max(50).required(),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = uuidv4();
  const phoneFieldId = uuidv4();
  const buttonFieldId = uuidv4();

  const handleSubmit = (values, actions) => {
    const { name, number } = values;
    dispatch(addContact({ id: uuidv4(), name, number }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={TourSchema}
      onSubmit={handleSubmit}
    >
      <Form className={style.form}>
        <label htmlFor={nameFieldId}>Name</label>

        <Field type="text" name="name" id={nameFieldId} placeholder="Name..." />

        <ErrorMessage name="name" component={"p"} style={{ color: "red" }} />

        <label htmlFor={phoneFieldId}>Number</label>

        <Field
          type="tel"
          name="number"
          id={phoneFieldId}
          placeholder="Number..."
        />

        <ErrorMessage name="number" component={"p"} style={{ color: "red" }} />

        <button type="submit" id={buttonFieldId}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
