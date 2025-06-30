# test-demo




## steps for project to correct
```
docker exec -it mongodb-rs mongosh
rs.initiate() // very important
rs.conf() // with this command, we can verify host for primary.

/* i was receiving error because of this configuration of mongo
{
  _id: 'rs0',
  members: [
    { _id: 0, host: '6e619e2813e3:27017' }
  ]
}
*/


cfg = rs.conf()
cfg.members[0].host = "localhost:27017"
rs.reconfig(cfg, { force: true })
```