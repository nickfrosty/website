---
date: 2022-01-10 00:00 EST
title: "Backup and restore MySQL databases (from the command line)"
blurb:
  "Database backups are important, especially being able to actually restore a
  database backup to your server quickly can be the difference is uptime."
description:
  "Database backups are important, but so is being able to quickly restore a
  database backup. And what is quicker than the command line?"
image: /media/articles/mysql/backup-and-restore-mysql-databasse-from-command-line.jpg
tags: mysql, database, backups
---

The simplest and most effective way to backup and restore your MySQL database is
with the command line. Using the `mysqldump` and `mysql` commands.

![how to backup and restore MySQL databases (from the command line)](/media/articles/mysql/backup-and-restore-mysql-databasse-from-command-line.jpg)

The last few days, I have been migrating [my side projects](/projects) between
two different servers. I needed a quick way to also
[backup and restore the MySQL databases](/articles/restore-mysql-database-from-backup-with-command-line).

While sometimes I _do_ like to use phpMyAdmin to create a quick database backup.
Sometimes I will get some weird errors while trying to import the database
later. Also, phpMyAdmin gets limited by your server's PHP file upload limit. So
that's annoying. So the command line is the best way to go for large databases!

## TLDR;

The quick and dirty version:

- have your MySQL username, password, and database name on hand
- ensure this MySQL user has the correct permission to create tables and records
- upload your backup file to the new MySQL server (if it's different from the
  initial server)

### Backup your MySQL database with mysqldump

To create a MySQL backup from the command line, use the `mysqldump` command:

```bash
mysqldump -u mysql_username -p datbase_name > /path/to/the/new/backup/file.sql
```

You will get prompted for the password for the `mysql_username` account. Then,
your database backup will begin.

This will create a full MySQL database backup to the same server in a new file
located at `/path/to/the/new/backup/file.sql`.

**Note:** If this file already exists, it will be overridden. If your ssh
account does not have write access to this file location, then the backup
operation will fail.

### Transfer the database backup to the new server

If you need to transfer the database backup to a different server, like I did,
you can securely download it using the `scp` command from **your local
computer**.

To **download** a file with `scp`, run this on your local computer:

```bash
scp remote_user_1@server_1_ip:/path/to/remote/file.sql /path/to/local/computer/save/directory
```

Then you can **upload** the file to the other server, run this on your local
computer:

```bash
scp /path/to/local/computer/save/file.sql remote_user_2@server_2_ip:/path/to/upload/remote/file.sql
```

### Restore a MySQL backup

With your backup file on the final server (or even the same server as the backup
was taken from), you can restore the MySQL database backup from the command line
using the `mysql` command:

```bash
mysql -u mysql_username -p database_name < /absolute/path/to/the/backup.sql
```

When prompted, enter your MySQL user account's password. Then you're off to the
races! 🚀

Your database tables and records will begin to be created. The overall time for
this to complete will vary based on the backup size, compression, and server
specs.

---

## How to backup and restore a MySQL database

To actually backup and restore the MySQL database backup using the command line,
you will need:

- the MySQL username and password for the database
- command line access to your MySQL server
- a database that your MySQL user has permissions to access, (or permissions to
  create one)

If you are using a MySQL provider like DigitalOcean, like me, then you should be
able to SSH into the server and be ready to go. If you are using a MySQL
provider like Bluehost or A2 hosting, then you may need to request SSH access
from their support line.

## Connect to your MySQL server

Using the command line, SSH into your MySQL server.

```sh
ssh server_username@ip_address
# or
ssh server_username@domain.tld
```

### List your MySQL databases

If you do not already know the name of the database you want to create a backup
of, then you can list the MySQL databases your MySQL user account has access to:

Using the `mysql` command line tool, aka `cli`, and a valid username and
password:

```sh
mysql -u mysql_username -p
```

You will get prompted to enter this MySQL user's account password. Then this
will connect to the database server, with the MySQL user `mysql_username`.

**Note:** The `-p` flag will let the terminal prompt us for the password.
Without the `-p` flag, then your connection will likely fail. Saying something
like "_password required_"

When your connection was successful, you can list the MySQL databases the
`mysql_username` account has access to:

```sql
show databases;
```

After you know the database name, exit from the `mysql` CLI:

```sql
exit;
```

## Create a MySQL database backup with mysqldump

In order to create our MySQL database backup, especially for a quick full
backup, I like to use the `mysqldump` command. Not only is it installed with
MySQL (and MariaDB) by default, but the command has basically the same syntax as
the `mysql` command. But more on that in a bit.

With the name of your database on hand, run the `mysqldump` command like this:

```bash
mysqldump -u mysql_username -p datbase_name > /path/to/the/new/backup/file.sql
```

- `-u mysql_username` - connects to the MySQL database with the MySQL user
  account names '_mysql_username_'
- `-p` - tells MySQL to prompt me to enter the user's password
- `datbase_name` - simply the name of the MySQL database you want to back up
- `> /path/to/the/new/backup/file.sql` - pipes the output from the command into
  a local file on the same server

---

<Callout type="warn">

Notice the direction of the `>` character. This tells the command to send the
MySQL database records into the specified file.

</Callout>

---

After running the command, you will get prompted for your password for the
`mysql_username` account. Then, your database backup will begin. Unfortunately,
you will not see any change in the terminal while the backup is in progress. But
once it is done, the terminal will drop back to the prompt. Allowing you to
continue.

And naturally, the time to create the backup will vary based on the size of the
database and the specs of the server. For a benchmark, my database was about
500k records and took ~2mins.

## Securely download your database backup

If you _need_ to transfer the database backup to a different server, like I did,
you can securely download it using the "_secure copy_" command `scp` command
from **your local computer**.

To **download** a file with `scp`, run this on your local computer:

```bash
scp remote_user_1@server_1_ip:/path/to/remote/file.sql /path/to/local/computer/save/directory
```

## Securely upload your database backup

In order to actually restore the backup on your MySQL server, you will need to
upload the backup file to the new server.

To **upload** the database backup from your local computer, use the "_secure
copy_" command `scp`:

```bash
scp /path/to/local/computer/save/file.sql remote_user_2@server_2_ip:/path/to/upload/remote/file.sql
```

**Note:** Both of these `scp` command examples are run from my **local
computer** since the SSH keys for each of these servers are on my computer. If
you have the SSH keys setup to transfer files directly between these two
servers, then you could simply `scp` between the two.

### Create your MySQL database server

Now that we are connected, we can show the list of available MySQL databases:

```sql
show databases;
```

### Delete MySQL database (as needed)

If you are restoring from a complete MySQL database backup from `mysqldump`,
then you may need to delete the already existing database, then recreate it.
Counter-productive, I know.

To delete a MySQL database, use this command:

```sql
drop database name_here;
```

<Callout>

In order to `DELETE` new MySQL databases, your user account will need the
`DELETE` permission item. If your account does not have it, you may need to
`DELETE` the database from your hosting control panel.

</Callout>

### Create a new MySQL database

If it does not already exist on the server, you can create a new MySQL database
with this command:

```sql
create database name_here;
```

<Callout>

In order to `CREATE` new MySQL databases, you user account will need the
`CREATE` permission item. If your account does not have it, you may need to
`CREATE` the database from your hosting control panel.

</Callout>

### Select the MySQL database to restore

Once your database exists, you can select it with the `use` command:

```sql
use database_name;
```

You **must select** (aka `use`) the database to use in order to restore the
backup.

## Restore the MySQL database from the backup

Since we have uploaded our database backup, we are ready to restore this backup.

Exit from the mysql cli, using the `exit;` command. Then from the regular
terminal prompt, restore your database backup:

```sql
mysql -u mysql_username -p database_name < /absolute/path/to/the/backup.sql
```

<Callout type="warn">

Notice the direction of the `<` character. This tells the command to read the
contents of the file and send it to the mysql program. (aka import the backup)

</Callout>

Hope this article helped our. Happy backups! 😁
