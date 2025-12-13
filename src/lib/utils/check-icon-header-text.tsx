import type { JSX } from "react";
import {
  GraduationCap,
  BookOpenCheckIcon,
  UserCheck2Icon,
  CircleQuestionMark,
} from "lucide-react";

// ********************************************JSDoc*************************************************************
/**
 * Returns the appropriate header icon and text based on the current pathname.
 *
 * The logic is derived from the URL structure:
 *
 * - No segments (`"/"`):
 *    → Shows a GraduationCap icon with "Diplomas".
 *
 * - One segment and NOT "account-setting":
 *    → Shows a BookOpenCheckIcon with "Exams".
 *
 * - One segment and IS "account-setting":
 *    → Shows a UserCheck2Icon with "Account Settings".
 *
 * - Two segments and the second segment length < 14:
 *    → Shows a GraduationCap icon with the last segment as text.
 *
 * - Two segments and the second segment length > 14:
 *    → Shows a GraduationCap icon with `[{cleanedSegment}] Questions`,
 *      where `cleanedSegment` is the part before the first "%" (e.g. decoded ID/title).
 *
 * - Three segments:
 *    → Shows a CircleQuestionMark icon with
 *      `[secondToLastSegment] Questions`.
 *
 * - Fallback (no matching case):
 *    → Returns an empty fragment.
 *
 *
 * @function checkIconAndHeaderText
 * @param {string} pathName - The current URL pathname (e.g. "/exams/123/questions").
 * @returns {JSX.Element} A JSX fragment containing the icon and corresponding header text.
 */

// **************************************************************************************************************

export function checkIconAndHeaderText(pathName: string): JSX.Element {
  const correctPath = pathName.split("/").filter(Boolean);

  switch (true) {
    case correctPath.length === 0:
      return (
        <>
          <GraduationCap size={45} /> Diplomas
        </>
      );

    case correctPath.length === 1 && !correctPath.includes("account-setting"):
      return (
        <>
          <BookOpenCheckIcon size={45} /> Exams
        </>
      );

    case correctPath.length === 1 && correctPath.includes("account-setting"):
      return (
        <>
          <UserCheck2Icon size={45} /> Account Settings
        </>
      );

    case correctPath.length === 2 && correctPath[1].length < 14:
      return (
        <>
          <GraduationCap size={45} /> {correctPath[correctPath.length - 1]}
        </>
      );

    case correctPath.length === 2 && correctPath[1].length > 14:
      return (
        <>
          <GraduationCap size={45} />{" "}
          <span>[{correctPath[1].split("%")[0]}] Questions</span>
        </>
      );

    case correctPath.length === 3:
      return (
        <>
          <CircleQuestionMark size={45} />[{correctPath[correctPath.length - 2]}
          ] <span>Questions</span>
        </>
      );

    default:
      return <></>;
  }
}
