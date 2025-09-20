import TagSelector from './TagSelector';
import { getAllSkills, createSkill } from '../../api/skills.api';

interface SkillsSelectorProps {
  selectedSkills: number[];
  onSkillsChange: (skills: number[]) => void;
  disabled?: boolean;
  maxSkills?: number;
}

export default function SkillsSelector({ 
  selectedSkills, 
  onSkillsChange, 
  disabled = false,
  maxSkills 
}: SkillsSelectorProps) {
  return (
    <TagSelector
      selectedTags={selectedSkills}
      onTagsChange={onSkillsChange}
      disabled={disabled}
      title="Skills *"
      placeholder="Add custom skill"
      addButtonText="Add"
      fetchTags={getAllSkills}
      createTag={createSkill}
      queryKey={['skills']}
      allowCustomTags={true}
      maxTags={maxSkills}
    />
  );
}