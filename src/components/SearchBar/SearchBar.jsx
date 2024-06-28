import { Formik, Form, Field } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import { IoSearch } from "react-icons/io5";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {


    return (
        <>
            <header className={css.search}>

                <Formik initialValues={{ query: "" }} onSubmit={(values, actions) => {
                    if (values.query === "") {
                        toast.error("Oops, empty search bar!!!")
                    }
                    onSearch(values.query);
                    actions.resetForm();
                }}>
                    <Form className={css.searchForm}>

                        <Field className={css.inputSearch}
                            type="text"
                            name="query"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos" />

                        <button className={css.buttonSubmit} type="submit">
                            <IoSearch size={16} />
                        </button>

                        <Toaster
                            position="top-right"
                            reverseOrder={false} />

                    </Form>

                </Formik>
            </header>
        </>
    )


} 