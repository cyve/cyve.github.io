<?php
$content = file_get_contents('markdown.html');

$content = str_replace("\n# ", "# ", $content);
$content = str_replace("\n## ", "\n\n## ", $content);
$content = str_replace("\n### ", "\n\n### ", $content);
$content = str_replace("\n##### - ", "\n##### ", $content);

file_put_contents('README.md', $content);
unlink('markdown.html');
