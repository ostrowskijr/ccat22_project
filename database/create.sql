drop schema if exists ccca;

create schema ccca;

create table ccca.account (
  acount_id uuid primary key,
  name varchar(100) not null,
  email varchar(100) not null unique,
  document varchar(20) not null unique,
  password varchar(20) not null  
);

create table ccca.deposit (
  deposit_id uuid primary key,
  account_id uuid not null references ccca.account(acount_id),
  assetId uuid not null,
  quantity numeric(10,2) not null
);

create table ccca.withdraw (
  withdraw_id uuid primary key,
  account_id uuid not null references ccca.account(acount_id),
  assetId uuid not null,
  quantity numeric(10,2) not null
);