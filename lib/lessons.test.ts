import { describe, expect, it } from "vitest";
import { isModuleId, LESSONS, MODULE_IDS, nextModule } from "@/lib/lessons";

describe("nextModule", () => {
  it("follows the lesson order", () => {
    expect(MODULE_IDS).toEqual(["rules", "positions", "formations", "rivalries", "history"]);
    expect(nextModule("rules")).toBe("positions");
    expect(nextModule("rivalries")).toBe("history");
  });

  it("stays on the last lesson", () => {
    expect(nextModule("history")).toBe("history");
  });
});

describe("LESSONS", () => {
  it("has unique ids and content for every lesson", () => {
    expect(new Set(MODULE_IDS).size).toBe(LESSONS.length);
    for (const lesson of LESSONS) {
      expect(lesson.description).not.toBe("");
      expect(lesson.sections.length).toBeGreaterThan(0);
    }
  });
});

describe("isModuleId", () => {
  it("accepts only known lessons", () => {
    expect(isModuleId("formations")).toBe(true);
    expect(isModuleId("tactics")).toBe(false);
  });
});
