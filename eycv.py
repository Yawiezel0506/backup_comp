from docx import Document

# Load the .docx file
doc = Document('your_file.docx')

# Extract text from all paragraphs
full_text = []
for para in doc.paragraphs:
    full_text.append(para.text)

# Join the text into a single string
extracted_text = '\n'.join(full_text)
print(extracted_text)