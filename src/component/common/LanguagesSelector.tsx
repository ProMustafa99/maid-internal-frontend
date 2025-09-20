// import TagSelector from './TagSelector';
// import { getAllLanguages, createLanguage } from '../../api/languages.api';

// interface LanguagesSelectorProps {
//   selectedLanguages: number[];
//   onLanguagesChange: (languages: number[]) => void;
//   disabled?: boolean;
//   maxLanguages?: number;
// }

// export default function LanguagesSelector({ 
//   selectedLanguages, 
//   onLanguagesChange, 
//   disabled = false,
//   maxLanguages 
// }: LanguagesSelectorProps) {
//   return (
//     <TagSelector
//       selectedTags={selectedLanguages}
//       onTagsChange={onLanguagesChange}
//       disabled={disabled}
//       title="Languages *"
//       placeholder="Add custom language"
//       addButtonText="Add"
//       fetchTags={getAllLanguages}
//       createTag={createLanguage}
//       queryKey={['languages']}
//       allowCustomTags={true}
//       maxLanguages={maxLanguages}
//     />
//   );
// }
