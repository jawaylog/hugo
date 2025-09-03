import os
import re

def add_quotes_to_image_field(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 增强正则表达式：允许任意空格，支持.md和.markdown
    pattern = r'^(image:\s+)([^"\n]+)$'
    replaced_content = re.sub(pattern, r'\1"\2"', content, flags=re.MULTILINE)
    
    if replaced_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(replaced_content)
        return True
    return False

def process_all_markdown_files():
    modified_count = 0
    current_dir = os.getcwd()
    
    # 搜索所有子目录的.md和.markdown文件
    for root, _, files in os.walk(current_dir):
        for file in files:
            if file.lower().endswith(('.md', '.markdown')):
                file_path = os.path.join(root, file)
                if add_quotes_to_image_field(file_path):
                    modified_count += 1
                    print(f"已处理: {file_path}")
    
    print(f"批量处理完成，共修改 {modified_count} 个文件")

if __name__ == "__main__":
    process_all_markdown_files()