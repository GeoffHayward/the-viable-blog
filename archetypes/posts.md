---
title: "{{ replace .Name "-" " " | title }}"
author: "Geoffrey Hayward"
date: {{ .Date }}
year: {{ dateFormat "2006" .Date }}
month: {{ dateFormat "2006/01" .Date }}
categories:
- Software and Web Development
tags:
- example tag
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel mollis augue. Aliquam ipsum arcu, laoreet ut aliquet vitae, commodo vel enim.
<!-- more -->
More...