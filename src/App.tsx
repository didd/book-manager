import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { kabul, lightGray } from "./lib/components/colors";
import { Stack } from "./lib/components/Stack";
import { SuccessMessage } from "./lib/components/SuccessMessage";
import { Wizard } from "./lib/components/Wizard";
import { Book, Genre, SubGenre } from "./model/genres";
import { useStore } from "./useStore";
import { AddBookForm } from "./views/Book";
import { GenreList } from "./views/Genre";
import { SubGenreList } from "./views/Subgenre";
import { AddNewSubgenreForm } from "./views/Subgenre/Form";

function App() {
  const [successMesage, setSuccessMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [initialStep, setInitialStep] = useState(0);
  const [currentGenre, setCurrentGenre] = useState<Genre | null>(null);
  const [currentSubGenre, setCurrentSubGenre] = useState<
    SubGenre | null | "addNew"
  >(null);
  const initialSteps = [
    { heading: "1", subHeading: "Genre" },
    { heading: "2", subHeading: "Subgenre" },
    { heading: "...", subHeading: "" },
  ];
  const fullSteps = [
    { heading: "1", subHeading: "Genre" },
    { heading: "2", subHeading: "Subgenre" },
    { heading: "3", subHeading: "Add new subgenre" },
    { heading: "4", subHeading: "Information" },
  ];
  const [steps, setSteps] = useState(initialSteps);
  const { genres } = useStore();

  const subgenreForm = useForm<SubGenre>({
    mode: "onChange",
    defaultValues: {
      id: 0,
      name: "",
      isDescriptionRequired: false,
      books: [],
    },
  });

  const bookForm = useForm<Book>({
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  const { addBook, addSubGenre } = useStore();

  const showingFullSteps = steps.length === 4;
  const showingPartialSteps = steps.length === 3;

  const canGoForward = () => {
    switch (currentStep) {
      case 0:
        return !!currentGenre;
      case 1:
        return !!currentSubGenre || showingFullSteps;
      case 2:
        return showingFullSteps
          ? subgenreForm.formState.isValid
          : bookForm.formState.isValid;
    }
    return bookForm.formState.isValid;
  };

  const onSubmit = bookForm.handleSubmit((data) => {
    const subGenre = subgenreForm.getValues();
    if (currentGenre) {
      const subGenreId =
        currentSubGenre && typeof currentSubGenre === "object"
          ? currentSubGenre.id
          : addSubGenre(
              currentGenre.id,
              subGenre.name,
              subGenre.isDescriptionRequired
            );

      if (subGenreId) {
        addBook(currentGenre.id, subGenreId, data);
        setSuccessMessage("Book added successfully");
      }
    }
  });

  const reset = () => {
    setSuccessMessage("");
    subgenreForm.reset();
    bookForm.reset();
    setInitialStep(0);
    setCurrentStep(0);
    setCurrentGenre(null);
    setCurrentSubGenre(null);
  };

  return (
    <Root>
      {!successMesage && (
        <Wizard
          steps={steps}
          title="Add book - New book"
          initialStep={initialStep}
          onCurrentIndex={setCurrentStep}
          onComplete={onSubmit}
          canGoForward={canGoForward()}
        >
          {currentStep === 0 && (
            <GenreList
              genres={genres}
              onClick={(genre) => {
                setCurrentGenre(genre);
              }}
              selected={currentGenre}
            />
          )}
          {currentStep === 1 && currentGenre && (
            <SubGenreList
              subgenres={currentGenre.subGenres}
              onClick={(subgenre) => {
                setCurrentSubGenre(subgenre);
                if (typeof subgenre === "string") {
                  setSteps(fullSteps);
                  return;
                }
                setSteps(initialSteps);
              }}
              selected={currentSubGenre}
            />
          )}
          {currentStep === 2 && showingFullSteps && (
            <FormProvider {...subgenreForm}>
              <AddNewSubgenreForm />
            </FormProvider>
          )}
          {((currentStep === 2 && showingPartialSteps) ||
            (currentStep === 3 && showingFullSteps)) && (
            <FormProvider {...bookForm}>
              <form onSubmit={onSubmit}>
                <AddBookForm
                  showDescription={
                    (!!currentSubGenre &&
                      typeof currentSubGenre === "object" &&
                      currentSubGenre.isDescriptionRequired) ||
                    subgenreForm.getValues().isDescriptionRequired
                  }
                />
              </form>
            </FormProvider>
          )}
        </Wizard>
      )}
      {successMesage && (
        <SuccessMessage
          message={successMesage}
          buttonText="Add another book"
          onClick={reset}
        />
      )}
    </Root>
  );
}

const Root = styled(Stack).attrs({
  direction: "column",
  spacing: 25,
})`
  border: 1px solid ${lightGray};
  border-radius: 6px;
  padding: 20px;
  color: ${kabul};
  max-width: 600px;
  margin: 100px auto;
`;

export default App;
