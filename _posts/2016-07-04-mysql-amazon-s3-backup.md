---
layout: post
title: Backup MySQL database to Amazon S3
tags: mysql backup amazon s3 aws
---

# Repository
The setup and usage is quite simple. Just follow the `README.md` at [`http://github.com/avinashjoshi/MySQL-AmazonS3-Backup`](http://github.com/avinashjoshi/MySQL-AmazonS3-Backup)

# Background
Recently, I was wondering about a good way to backup my MySQL databases to some place that is safe, reliable and easily accessible and not in the same server where my code is hosted. By now I have had some experience with Amazon Web Services (AWS). They are so easy to work with!

Initially I was using my dedicated hosting provider's default backup service. Problem? I have no idea where my backup is and in case of emergency, there would be some latency. So, I wrote a quick script that uses [AWS Command Line Interface (CLI)](https://aws.amazon.com/cli/) to backup!

