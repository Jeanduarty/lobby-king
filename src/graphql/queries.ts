import { gql } from "graphql-request"

export function GET_DATA(id: number) {
  const query = gql`
  query {
    match(id: ${id}) {
      didRadiantWin
      startDateTime
      durationSeconds
      players {
        hero {
          name
        },
        kills
        deaths
        assists
        level
        networth
        position
        isRadiant
        steamAccount {
          id
          name,
          avatar
        }
      }
    }
  }
  `
  return query
}

